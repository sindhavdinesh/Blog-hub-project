export const validateBlogForm = (title, author, description, image) => {
  const tempErrors = {};
  if (!title.trim()) {
    tempErrors.title = 'Title is required';
  } else if (title.trim().length < 5) {
    tempErrors.title = 'Title must be at least 5 characters long';
  }

  if (!author.trim()) {
    tempErrors.author = 'Author name is required';
  }

  if (!description.trim()) {
    tempErrors.description = 'Blog content is required';
  } else if (description.trim().length < 10) {
    tempErrors.description = 'Content must be at least 10 characters long';
  }

  if (!image) {
    tempErrors.image = 'Cover image is required';
  }

  return {
    errors: tempErrors,
    isValid: Object.keys(tempErrors).length === 0,
  };
};
