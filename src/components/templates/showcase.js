import React from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';
import { FormattedDate, FormattedMessage } from "react-intl";
import { Link } from "gatsby";

const BlogTemplate = props => {
  let frontmatter = props.pageContext.node.frontmatter;
  let img = frontmatter.img.childImageSharp.fluid;

  const style = {
    meta: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      fontFamily: "'Roboto Condensed', sans-serif",
    },
    title: {
      marginBottom: 0,
    },
    figure: {
      marginTop: 0,
    }
  }

  return (
    <React.Fragment>
      <h1 style={style.title}>{props.pageContext.node.frontmatter.title}</h1>
      <div style={style.meta}>
        <FormattedDate value={frontmatter.date} year="numeric" month="long" day="2-digit"/>
        <div>
    { frontmatter.patterns.map( pattern => (
          <React.Fragment>
            <Link to={"/showcase/"+pattern}>#{pattern}</Link>
            &nbsp;
          </React.Fragment>
    ))}
          <FormattedMessage id="app.by" /> <Link to={"/users/"+frontmatter.author}>{frontmatter.author}</Link>
        </div>
      </div>
      <figure style={style.figure}>
        <a href={img.originalImg}>
          <img
            src={img.base64}
            style={{width: "100%"}}
            srcset={img.srcSet}
            alt={frontmatter.caption}
          />
        </a>
        <figcaption>{frontmatter.caption}</figcaption>
      </figure>
      <MDXProvider components={props.components}>
        <MDXRenderer>
          {props.pageContext.node.code.body}
        </MDXRenderer>
      </MDXProvider>
    </React.Fragment>
  );
}

export default BlogTemplate;
