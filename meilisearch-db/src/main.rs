use serde::{Deserialize, Serialize};
use std::{fs::File, io::prelude::*};

use clap::{AppSettings, Parser, Subcommand};

use meilisearch_sdk::{client::*, document::*};

use futures::executor::block_on;
use gray_matter::engine::YAML;
use gray_matter::Matter;

use chrono::Utc;

#[derive(Serialize, Deserialize, Debug)]
struct Post {
    // Unchangeable publication date
    publish_date: Option<i64>,
    // Last time post was edited
    update_date: Option<i64>,
    // Post title as seen by the reader
    title: String,
    // Post human readable resource name
    slug: String,
    // To be used when previewing thepost
    summary: String,
    // Post content
    content: Option<String>,
    // Optional image to use for previews
    image: Option<String>,
    // What subjects is the post about
    tags: Vec<String>,
    // Who wrote the post
    authors: Vec<String>,
}

impl Document for Post {
    type UIDType = String;
    fn get_uid(&self) -> &Self::UIDType {
        &self.slug
    }
}

#[derive(Parser, Debug)]
#[clap(author, version, about, long_about=None)]
#[clap(global_setting(AppSettings::PropagateVersion))]
#[clap(global_setting(AppSettings::UseLongFormatForHelpSubcommand))]
struct Cli {
    #[clap(long = "server-url")]
    server_url: String,
    #[clap(long = "server-key")]
    server_key: String,
    #[clap(subcommand)]
    action: Actions,
}

#[derive(Subcommand, Clone, Debug)]
enum Actions {
    QueryKey,
    MutatePost {
        #[clap(long)]
        post: String,
        #[clap(long)]
        index: String,
    },
    SortAttributes,
}

fn main() {
    let cli = Cli::parse();

    match &cli.action {
        Actions::SortAttributes => block_on(async move {
            let sortable_attributes: Vec<String> = Client::new(cli.server_url, cli.server_key)
                .index("blog-posts")
                .get_sortable_attributes()
                .await
                .unwrap();

            println!("{:?}", sortable_attributes);
        }),
        Actions::QueryKey => block_on(async move {
            let client = Client::new(cli.server_url, cli.server_key);

            let keys = client.get_keys().await.unwrap();

            println!("Public Key: {:?}", keys);
        }),
        Actions::MutatePost { post, index } => {
            // Find the post
            let mut file = File::open(post).expect("Something went wrong reading the file");

            // Create heap container
            let mut content = String::new();

            // Read into the head container
            file.read_to_string(&mut content).unwrap();

            // Parse front matter and content
            let matter = Matter::<YAML>::new();
            let result = matter.parse(&content);

            // Turn into struct Post
            let mut post: Post = result.data.unwrap().deserialize().unwrap();
            // Add content to Post
            post.content = Some(result.content);

            block_on(async move {
                let client = Client::new(cli.server_url, cli.server_key);

                let current_index = client.index(index);

                // check if document exists
                match current_index
                    .get_document::<Post>(post.slug.to_string())
                    .await
                {
                    Ok(doc) => {
                        // if it exists, copy publish_date, and change update_date
                        let publish_date = doc.publish_date;
                        let update_date = Utc::now().timestamp();

                        post.publish_date = publish_date;
                        post.update_date = Some(update_date);

                        current_index
                            .add_or_replace(&[post], Some("slug"))
                            .await
                            .unwrap();
                    }
                    Err(_) => {
                        // otherwise, create new document, with publish_date
                        let publish_date = Utc::now().timestamp();
                        post.publish_date = Some(publish_date);

                        current_index
                            .add_documents(&[post], Some("slug"))
                            .await
                            .unwrap();
                    }
                }
            });
        }
    }
}
