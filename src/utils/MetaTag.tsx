import { Helmet } from "react-helmet-async";

const MetaTag = (props: any) => {
  // props로 content 내용을 불러올 예정
  return (
    <Helmet>
      <title>{props.title}</title>

      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:site_name" content={props.title} />
      <meta property="og:description" content="국내 여행 코스 공유 커뮤니티" />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/95006849/222713715-dfc21ea2-4173-4c96-b4a3-ea03ea99e98e.png"
      />
      <meta property="og:url" content={props.url} />

      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content="국내 여행 코스 공유 커뮤니티" />
      <meta
        name="twitter:image"
        content="https://user-images.githubusercontent.com/95006849/222713715-dfc21ea2-4173-4c96-b4a3-ea03ea99e98e.png"
      />

      <link rel="canonical" href={props.url} />
    </Helmet>
  );
};

export default MetaTag;
