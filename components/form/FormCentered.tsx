import Form from './Form';

type FormProps = React.ComponentProps<typeof Form>;

export default function FormCentered(props: FormProps) {
  return (
    <Form
      {...props}
      contentContainerClassName={`justify-center ${props.contentContainerClassName || ''}`}
    />
  );
}
