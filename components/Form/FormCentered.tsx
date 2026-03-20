import Form from './Form';

type FormProps = React.ComponentProps<typeof Form>;

export default function FormCentered(props: FormProps) {
  return (
    <Form {...props} contentContainerStyle={{ justifyContent: 'center', ...props.contentContainerStyle }}/>
  );
}