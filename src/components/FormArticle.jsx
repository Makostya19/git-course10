import { useForm } from 'react-hook-form';

export default function FormArticle({ initialValues = {}, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Title"
        {...register('title', { required: 'Title is required' })}
      />
      {errors.title && <p>{errors.title.message}</p>}

      <input
        placeholder="Description"
        {...register('description', { required: 'Description is required' })}
      />
      {errors.description && <p>{errors.description.message}</p>}

      <textarea
        placeholder="Body"
        {...register('body', { required: 'Body is required' })}
      />
      {errors.body && <p>{errors.body.message}</p>}

      <button type="submit">{initialValues.title ? 'Update' : 'Create'}</button>
    </form>
  );
}
