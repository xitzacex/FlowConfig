function HomePage() {
  return (
    <main className="home-page">
      {/* This section introduces the user to the purpose of FlowConfig. */}
      <section className="home-hero">
        <p className="home-label">AgentFlow configuration</p>

        <h2>Welcome to FlowConfig</h2>

        <p className="home-description">
          Browse, edit and validate the Markdown and JSON files used to
          configure custom AI agents.
        </p>

        <button className="primary-button" type="button">
          Browse agents
        </button>
      </section>

      {/* These cards give the homepage some useful summary information. */}
      <section className="summary-grid">
        <article className="summary-card">
          <p>Agents</p>
          <strong>3</strong>
        </article>

        <article className="summary-card">
          <p>Markdown files</p>
          <strong>4</strong>
        </article>

        <article className="summary-card">
          <p>JSON files</p>
          <strong>6</strong>
        </article>
      </section>
    </main>
  );
}

export default HomePage;