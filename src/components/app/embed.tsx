// TODO: Add support for more embed types

const Embed: React.FC<{ url: string }> = ({ url }) => {
  // if (url.match(/\.(jpeg|jpg|gif|png|avif|webp)$/) != null) {
  //   // eslint-disable-next-line
  //   return <img src={url} alt="embed" className="mt-3 w-full" loading="lazy" />;
  // }

  // eslint-disable-next-line
  return (
    <img
      src={url}
      alt="embed"
      className="mt-3 w-full rounded-sm"
      loading="lazy"
    />
  );
};

export default Embed;
