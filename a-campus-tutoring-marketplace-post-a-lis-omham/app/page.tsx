import { useState, useEffect } from 'react';
import styles from "./page.module.css";

interface Tutor {
  id: number;
  name: string;
  subject: string;
}

export default function Home() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    fetch('/api/items')
      .then(response => response.json())
      .then(data => setTutors(data));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, subject }),
    })
      .then(response => response.json())
      .then(data => setTutors([...tutors, data]));
  };

  const handleDelete = (id: number) => {
    fetch(`/api/items/${id}`, { method: 'DELETE' })
      .then(() => setTutors(tutors.filter(tutor => tutor.id !== id)));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Tutoring Marketplace</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            Subject:
            <input type="text" value={subject} onChange={(event) => setSubject(event.target.value)} />
          </label>
          <button type="submit">Post Listing</button>
        </form>
        <ul>
          {tutors.map(tutor => (
            <li key={tutor.id}>
              {tutor.name} - {tutor.subject}
              <button onClick={() => handleDelete(tutor.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
