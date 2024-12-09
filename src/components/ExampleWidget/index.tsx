import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

type FeatureItem = {
  title: string;
  iconPath: string;
  description: JSX.Element;
  htmlContent?: JSX.Element;
  links?: [{ icon: string; url: string }];
};

function Feature({
  title,
  description,
  links,
  htmlContent,
}: FeatureItem) {
  return (
    <div>
      <h6 className={styles.title}>{title}</h6>
      {description ? <p className={styles.description}>{description}</p> : null}
      <div className={styles.langContainer}>
        {links ? (
            links.map((link) => {
              return (
                  <div id="overviewButtonDiv">
                    <a
                        className={`overviewButton btn btn-primary btn-lg firstTimeButton  ${styles.lang}`}
                        href={link.url}
                        target={"_blank"}
                        role="button"
                    >
                      <img
                          className="buttonIcon"
                          src={link.icon ? link.icon : "/img/arrow-right.svg"}
                          width="24"
                      />
                    </a>
                  </div>
              );
            })
        ) : htmlContent ? (
            htmlContent
        ) : null}
      </div>
    </div>
  );
}

export default function ExampleWidget({ itemsPerRow, boxStyling, features }): JSX.Element {

    const colSize = itemsPerRow ? Math.floor(12 / itemsPerRow) : 4;
    return (
      <section>
          <div className="container">
              <div className={"row"}>
                  {features.map((props, idx) => (
                      <div className={clsx(`col col--${colSize} margin-vert--md padding-md`)}>
                          <div className={boxStyling}>
                            <Feature key={idx} {...props}/>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

  );
}
