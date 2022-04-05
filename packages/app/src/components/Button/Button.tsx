export default function Button(props: JSX.IntrinsicElements["button"]) {
  const className =
    "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-4 rounded w-full text-base inline-flex items-center justify-center".concat(
      props.className ?? ""
    );

  return <button className={className} {...props} />;
}
