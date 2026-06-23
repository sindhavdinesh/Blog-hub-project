import Link from 'next/link';

export default function Header() {
  return (
    <div className="navbar-wrapper">
      <header className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            📚 BlogHub
          </Link>
          <nav className="nav-links">
            <Link href="/blog/create" className="btn-primary">
              New post
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
