import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Presentation mode: open the project directly with no login or staff accounts.
// Supabase Row Level Security must remain enabled for private records.
createRoot(document.getElementById('root')!).render(<App />);
