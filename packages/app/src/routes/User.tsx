import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();

  return (
    <div>
      Hello world
      {id}
    </div>
  );
}
