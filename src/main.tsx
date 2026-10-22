import { createRoot } from 'react-dom/client';
import PublicDashboard from './components/PublicDashboard';
import './index.css';

// Temporary public dashboard landing page. Secure data workflows remain behind
// the staff authentication flow in the full application.
createRoot(document.getElementById('root')!).render(<PublicDashboard />);
