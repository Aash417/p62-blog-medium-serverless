/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateBlog } from '@/hooks/blogHooks';
import { FieldApi, useForm } from '@tanstack/react-form';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';


function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
	return (
		<>
			{field.state.meta.touchedErrors ? <em>{field.state.meta.touchedErrors}</em> : null}
			{field.state.meta.isValidating ? 'Validating...' : null}
		</>
	);
}

function Publish() {
	const { mutate } = useCreateBlog();
	const form = useForm({
		defaultValues: {
			title: '',
			content: '',
		},
		onSubmit: async ({ value }) => {
			mutate(value);
		},
	});
	const [value, setValue] = useState('');
	return (
		<div className='flex items-center justify-center pt-8 mx-auto'>
			<div className='w-full font-mono rounded-lg lg:w-2/4 md:w-2/4'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<div className='relative z-0 w-full mb-5 group'>
						{/* A type-safe field component*/}
						<form.Field
							name='title'
							validators={{
								onChange: ({ value }) =>
									!value
										? 'A title is required'
										: value.length < 3
										? 'Title must be at least 3 characters'
										: undefined,
								onChangeAsyncDebounceMs: 500,
								onChangeAsync: async ({ value }) => {
									await new Promise((resolve) => setTimeout(resolve, 1000));
									return (
										value.includes('error') &&
										'No "error" allowed in first name'
									);
								},
							}}
							children={(field) => {
								// Avoid hasty abstractions. Render props are great!
								return (
									<>
										<input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
										/>
										<label
											htmlFor={field.name}
											className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
										>
											Title
										</label>
										<FieldInfo field={field} />
									</>
								);
							}}
						/>
					</div>
					<div className='relative z-0 w-full mb-5 group'>
						<form.Field
							name='content'
							children={(field) => (
								<>
									<Editor
										apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
										init={{
											height: 300,
											menubar: true,
											plugins: [
												'image',
												'advlist',
												'autolink',
												'lists',
												'link',
												'image',
												'charmap',
												'preview',
												'anchor',
												'searchreplace',
												'visualblocks',
												'code',
												'fullscreen',
												'insertdatetime',
												'media',
												'table',
												'code',
												'help',
												'wordcount',
												'anchor',
											],
											toolbar:
												'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help',
											content_style:
												'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
										}}
										// onEditorChange={onChange={(e) => field.handleChange(e.target.value)}}

										id={field.name}
										// name={field.name}
										value={value}
										onBlur={field.handleBlur}
										onEditorChange={(newValue) => setValue(newValue)}
										onChange={() => field.handleChange(value)}
									/>
									<FieldInfo field={field} />
								</>
							)}
						/>
					</div>
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<button
								type='submit'
								className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 '
								disabled={!canSubmit}
							>
								{isSubmitting ? '...' : 'Submit'}
							</button>
						)}
					/>
				</form>
			</div>
		</div>
	);
}

export default Publish;
