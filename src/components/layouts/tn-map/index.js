
import React, { Fragment, useState } from "react";
import "./tn-map.css";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import { STYLES_MAP } from "./constants";
import { MAP_JSON } from './constants';
function Map() {
  const scale = 1300;
  const [tooltipfunction, settooltipfunction] = useState(false);
  const entertooltip = () => {
    settooltipfunction(true)
  }
  const leavetooltip = () => {
    settooltipfunction(false)
  }
  return (
    <Fragment>
      <div onMouseLeave={leavetooltip} onMouseEnter={entertooltip}>
        <ComposableMap
          projectionConfig={{ scale }}
          width={300}
          height={500}
        >
          <ZoomableGroup zoom={4.4} center={[78.25, 10.8]} disablePanning>
            {MAP_JSON && (
              <Geographies geography={MAP_JSON}>
                {(geographies, projection) =>
                  geographies.map((geography, i) => {

                    return (
                      <Geography
                        key={geography.properties.NAME}
                        data-tip={`${geography.properties.district
                          }`}
                        data-tooltip-index={i}
                        geography={geography}
                        projection={projection}
                        precision={0.5}
                        style={{
                          default: STYLES_MAP.default,
                          hover: STYLES_MAP.hover,
                          pressed: STYLES_MAP.pressed
                        }}

                      />
                    );
                  })
                }
              </Geographies>
            )}
          </ZoomableGroup>
        </ComposableMap>
        {tooltipfunction === true ? <ReactTooltip /> : ""}
      </div>
    </Fragment>
  );
}

export default Map;