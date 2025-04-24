// For secure typing of props, either rely on TypeScript, on TSDoc or on PropTypes library

import { useState } from "react";

export default function MovieItemEdit(props) {
  const [title, setTitle] = useState(props.movie.title);
  const [description, setDescription] = useState(props.movie.description);

  const handleSubmit = () =>
    props.onSubmit({
      ...props.movie,
      title,
      description,
    });

  return (
    <>
      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Description</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit edit</button>
    </>
  );
}
