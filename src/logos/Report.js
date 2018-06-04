import React from "react";
import PropTypes from "prop-types";

export const Report = ({ fill, handler }) => {
  return (
    <g
      transform="scale(0.15)translate(40,85)"
      onClick={handler}
      style={{
        cursor: "pointer"
      }}
    >
      <circle fill={fill} cx="256" cy="256" r="256" />
      <path
        fill="#121149"
        d="M259.889,511.95c122.501-1.827,224.144-89.683,247.196-205.848L369.778,168.796L258.586,333.288
	l16.815,16.815l-129.239,48.119L259.889,511.95z"
      />
      <polygon
        fill="#FFFFFF"
        points="311.696,110.714 146.161,110.714 146.161,398.222 369.778,398.222 369.778,168.796 "
      />
      <polygon
        fill="#D0D1D3"
        points="369.778,168.796 311.696,110.714 255.426,110.714 255.426,398.222 369.778,398.222 "
      />
      <polygon
        fill="#A6A8AA"
        points="311.696,168.796 369.778,168.796 311.696,110.714 "
      />
      <rect
        x="199.111"
        y="197.577"
        fill="#FFC61B"
        width="28.444"
        height="56.889"
      />
      <rect
        x="241.778"
        y="169.132"
        fill="#EAA22F"
        width="28.444"
        height="85.333"
      />
      <rect x="256" y="169.132" fill="#E09112" width="14.222" height="85.333" />
      <rect
        x="284.444"
        y="226.021"
        fill="#C92F00"
        width="28.444"
        height="28.444"
      />
      <rect
        x="172.632"
        y="262.654"
        fill="#FF5419"
        width="170.667"
        height="12.067"
      />
      <rect
        x="255.431"
        y="262.654"
        fill="#C92F00"
        width="87.876"
        height="12.067"
      />
      <g>
        <rect
          x="286.703"
          y="303.597"
          fill="#D0D1D3"
          width="56.606"
          height="4.003"
        />
        <rect
          x="286.703"
          y="321.233"
          fill="#D0D1D3"
          width="56.606"
          height="4.003"
        />
        <rect
          x="286.703"
          y="338.851"
          fill="#D0D1D3"
          width="56.606"
          height="4.003"
        />
        <rect
          x="286.703"
          y="356.486"
          fill="#D0D1D3"
          width="56.606"
          height="4.003"
        />
      </g>
      <path
        fill="#6CAF5F"
        d="M244.076,302.266c-7.587-6.934-17.686-11.164-28.774-11.164c-12.147,0-23.1,5.086-30.87,13.233
	c-7.302,7.658-11.797,18.018-11.797,29.434c0,11.088,4.23,21.185,11.166,28.772c7.802,8.537,19.025,13.895,31.501,13.895
	c23.564,0,42.667-19.103,42.667-42.667C257.969,321.291,252.613,310.069,244.076,302.266z"
      />
      <path
        fill="#2E5E24"
        d="M244.076,302.266l-60.275,60.275c7.802,8.537,19.025,13.895,31.501,13.895
	c23.564,0,42.667-19.103,42.667-42.667C257.969,321.291,252.613,310.069,244.076,302.266z"
      />
      <path
        fill="#8BC180"
        d="M244.076,302.266c-7.587-6.934-17.686-11.164-28.774-11.164c-12.147,0-23.1,5.086-30.87,13.233
	l28.787,28.788L244.076,302.266z"
      />
      <g>
        <path
          fill="#6CAF5F"
          d="M184.432,304.333c-7.302,7.658-11.797,18.018-11.797,29.434c0,11.088,4.23,21.185,11.166,28.772
		l29.418-29.418L184.432,304.333z"
        />
        <rect
          x="172.632"
          y="125.631"
          fill="#6CAF5F"
          width="60.235"
          height="15.058"
        />
      </g>
    </g>
  );
};

export default Report;

Report.propTypes = {
  fill: PropTypes.string,
  handler: PropTypes.func
};
