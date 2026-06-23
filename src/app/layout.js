import './globals.css';
import StoreProvider from './StoreProvider';
import Header from '../Components/Common/Header/Header';

export const metadata = {
  title: 'Futuristic Blogs | Premium Fullstack Blog App',
  description: 'Write, edit, delete, and read beautiful stories powered by Next.js, MongoDB Atlas, and Cloudinary.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="aurora-bg"></div>
        <Header />
        
        {/* Main Content Area */}
        <main className="container">
          <StoreProvider>
            {children}
          </StoreProvider>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p>
              &copy; 2026 BlogHub
            </p>
          </div>
        </footer>


      </body>
    </html>
  );
}
