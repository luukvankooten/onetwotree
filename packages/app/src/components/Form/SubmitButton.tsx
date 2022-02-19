import Button from "../Button/Button";

interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  return (
    <div className="mb-8">
      <Button type="submit">{text}</Button>
    </div>
  );
}
