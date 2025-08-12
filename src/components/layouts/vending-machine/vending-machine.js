import React, { useEffect } from "react";
import "./vending-machine.css";
import { useGetHomepageSectionTwoMutation } from "../../../Api/VendingMachine/vendingMachineApi";


function Machine() {
  const [fetchSection, { data, isLoading, isError, error }] = useGetHomepageSectionTwoMutation();

  useEffect(() => {
    fetchSection();
  }, [fetchSection]);

  const language = localStorage.getItem("language");
 
  const cleanHtml = (html) => {
    return html
      ?.replaceAll(/<script>/gi, "")
      .replaceAll(/<\/script>/gi, "")
      .replaceAll(/javascript/gi, "")
      .replaceAll(/alert/gi, "")
      .replaceAll(/Alert/gi, "");
  };

  if (isLoading) {
    return <div className="machine-total-section"><p>Loading...</p></div>;
  }

  if (isError) {
    console.error(error);
    return <div className="machine-total-section"><p>Something went wrong loading the section.</p></div>;
  }

  const {
    sectiontwoTitle,
    sectiontwoDescription,
    tamilsectiontwoTitle,
    tamilsectiontwoDescription,
    sectiontwoImage,
    filePath,
  } = data?.data || {};



  return (
    <div className="machine-total-section">
      <div className="container formobileonly">
        <div className="row">
          <div className="col-lg-7 col-md-6 col-12">
            <div className="full-card-machine">
              <>
                {language === "Tamil" ? (
                  <>
                    <h5 className="machine-header">
                      {tamilsectiontwoTitle || sectiontwoTitle}
                    </h5>
                    <div className="animation-details">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: cleanHtml(tamilsectiontwoDescription || sectiontwoDescription),
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h5 className="machine-header">{sectiontwoTitle}</h5>
                    <div className="animation-details">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: cleanHtml(sectiontwoDescription),
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 col-12">
            <video
              className="manjapai-machine-video"
               src={`${filePath}${sectiontwoImage}`}
              muted
              autoPlay
              preload="auto"
              loop
            ></video>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Machine;
