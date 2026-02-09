import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';

export default function FormArticle({ initialValues = {}, onSubmit }) {
  const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm({
    defaultValues: {
      ...initialValues,
      tagList: initialValues.tagList || [],
    },
  });

  const { fields, append, remove } = useFieldArray({ name: 'tagList', control });
  const tagList = watch('tagList');
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() === '') return;
    append(newTag.trim());
    setNewTag('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Title"
        {...register('title', { required: 'Title is required' })}
      />
      {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}

      <input
        placeholder="Description"
        {...register('description', { required: 'Description is required' })}
      />
      {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}

      <textarea
        placeholder="Body"
        {...register('body', { required: 'Body is required' })}
      />
      {errors.body && <p style={{ color: 'red' }}>{errors.body.message}</p>}

      <div style={{ marginTop: '1rem' }}>
        <label style={{ fontWeight: '500', marginBottom: '0.5rem', display: 'inline-block' }}>
          Tags
        </label>

        {/* Список тегов */}
        <div
          className="tags"
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '0.5rem',
          }}
        >
          {fields.map((field, index) => (
            <div
              key={field.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ddd',
                padding: '0.35rem 0.6rem',
                borderRadius: '12px',
                gap: '0.4rem',
              }}
            >
              <input
                {...register(`tagList.${index}`)}
                placeholder="Tag"
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: '0',
                  outline: 'none',
                  fontSize: '0.9rem',
                  width: 'auto',
                }}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#a00',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  lineHeight: '1rem',
                  marginLeft: '0.3rem', // небольшое расстояние
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Поле для нового тега */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add new tag"
            style={{
              flex: '1',
              padding: '0.35rem 0.6rem',
              borderRadius: '12px',
              border: '1px solid #ccc',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={handleAddTag}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '12px',
              backgroundColor: '#3ea55f',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Add Tag
          </button>
        </div>
      </div>

      <button
        type="submit"
        style={{
          marginTop: '1rem',
          padding: '0.7rem 1.2rem',
          borderRadius: '4px',
          backgroundColor: '#3ea55f',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        {initialValues.title ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
