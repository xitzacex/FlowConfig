function Header() {
  return (
    <header className="app-header">
      {/* I keep the product name on the left so the user always knows which tool they are using. */}
      <div className="header-brand">
        <h1>FlowConfig</h1>
        <span>AgentFlow configuration workspace</span>
      </div>

      {/* This is only a placeholder for future actions such as settings or publishing. */}
      <button className="header-button" type="button">
        Settings
      </button>
    </header>
  );
}

export default Header;