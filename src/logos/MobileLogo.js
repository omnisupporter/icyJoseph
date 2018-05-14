import React from "react";
import PropTypes from "prop-types";

export const Mobile = ({ screen, children }) => {
  const Component = children;
  return (
    <svg
      style={{
        width: "248px"
      }}
    >
      <g transform="scale(4)translate(-76.355037,-112.54221)">
        <g
          style={{ strokeWidth: 1.44624281 }}
          transform="matrix(0.37889422,-0.5118174,0.7475243,0.25205664,-39.275628,142.76482)"
          id="g3930"
        >
          <rect
            style={{ fill: "#000", strokeWidth: 0.38265172 }}
            id="rect3849"
            width="35.71875"
            height="68.791672"
            x="80.697914"
            y="111.79167"
            rx="4.7246165"
            ry="6.9730625"
          />
          <rect
            style={{ fill: screen || "none", strokeWidth: 0.38265172 }}
            id="rect3849-2"
            width="34.395832"
            height="60.854172"
            x="81.391335"
            y="115.76042"
            rx="4.7246165"
            ry="6.9730625"
          />
          <Component scale={0.05} translate={{ X: 2600, Y: 1550 }} />
          <rect
            style={{ fill: "#fff", strokeWidth: 0.38265172 }}
            id="rect3873"
            width="14.552076"
            height="1.0583291"
            x="91.28125"
            y="113.37917"
            rx="0.62994933"
            ry="2.3243527"
          />
          <rect
            style={{ fill: "#fff", strokeWidth: 0.38265172 }}
            id="rect3873-7"
            width="14.552081"
            height="1.0583291"
            x="91.28125"
            y="177.9375"
            rx="0.62994933"
            ry="2.3243527"
          />
          <circle
            style={{ fill: "#fff", strokeWidth: 0.38265172 }}
            id="path3890"
            cx="86.651039"
            cy="113.90833"
            r="0.66145831"
          />
          <ellipse
            style={{ fill: "#fff", strokeWidth: 0.38265172 }}
            id="path3892"
            cx="109.47134"
            cy="114.00755"
            rx="0.33072916"
            ry="0.36380208"
          />
          <path
            transform="matrix(0.13948998,0.28324348,-0.4136854,0.20968282,108.21532,99.834219)"
            id="path4066"
            d="m 183.58539,130.16501 c -1.82239,-0.32005 -5.06223,-1.16479 -8.181,-2.13306 C 173.34629,127.39298 78.761413,96.774731 36.365756,83.023493 14.280204,75.859935 7.7553538,73.632453 5.6949995,72.552973 2.9678725,71.124152 1.6073206,68.551695 1.2432938,64.135932 l -0.1098718,-1.33278 0.704736,0.883883 c 2.2282211,2.794647 6.3235743,5.473964 11.016298,7.207232 4.992982,1.844169 158.259384,53.366723 159.894524,53.750683 3.13191,0.73543 5.88714,1.05056 9.19238,1.05136 6.00124,0.001 10.44235,-1.32703 12.86449,-3.84822 0.56125,-0.5842 9.34047,-12.31844 19.50939,-26.076084 10.16894,-13.757647 18.56942,-25.093452 18.66774,-25.190679 0.12048,-0.119129 0.14788,0.716773 0.084,2.563262 -0.11382,3.292256 -0.26394,3.773672 -2.12453,6.813204 -5.20475,8.502646 -22.51395,33.024887 -29.44271,41.711997 -0.93057,1.16673 -2.7288,3.15791 -3.99606,4.42486 -2.6499,2.64925 -3.18265,2.9642 -6.28158,3.71356 -2.43054,0.58773 -5.50415,0.73133 -7.63675,0.3568 z"
            style={{ fill: "#ADB2BD", strokeWidth: 1.44624281 }}
          />
        </g>
        <path
          id="path4054"
          d="m 122.36488,146.46058 c 1.06125,0.32527 2.1227,0.65059 2.96735,0.72773 0.84464,0.0771 1.47326,-0.0936 2.01618,-0.24132 0.54292,-0.14768 1.00021,-0.27231 2.74428,-2.49766 1.74408,-2.22536 4.77297,-6.54855 6.32998,-8.86305 1.55701,-2.31451 1.64359,-2.62226 1.69206,-2.88518 0.0485,-0.26292 0.0588,-0.48003 0.067,-0.84107 0.008,-0.36104 0.0145,-0.86345 0.0177,-1.15289 0.003,-0.28944 0.004,-0.36473 0.004,-0.44032"
          style={{
            fill: "none",
            stroke: "#000",
            strokeWidth: "0.26458332px",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeOpacity: 1
          }}
        />
        <path
          id="path4058"
          d="m 76.490538,128.00589 c -0.0018,0.0894 -0.0035,0.1788 -0.0024,0.51005 0.0012,0.33125 0.0052,0.9038 0.09728,1.48664 0.09204,0.58284 0.2732,1.18048 0.806304,1.62063 0.533104,0.44015 1.422227,0.72818 8.831846,3.12867 7.409619,2.40048 21.941656,7.10844 36.141286,11.7087"
          style={{
            fill: "none",
            stroke: "#000",
            strokeWidth: "0.26458332px",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeOpacity: 1
          }}
        />
      </g>
    </svg>
  );
};

export default Mobile;

Mobile.propTypes = {
  screen: PropTypes.string,
  children: PropTypes.func
};
