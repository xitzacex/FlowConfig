import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props { children: ReactNode; } interface State { failed: boolean; }
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };
  static getDerivedStateFromError(): State { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("FlowConfig UI error", error, info.componentStack); }
  render() { return this.state.failed ? <main className="fatal-error"><h1>FlowConfig hit an unexpected error</h1><p>Your saved files have not been removed.</p><button className="primary-button" type="button" onClick={() => window.location.reload()}>Reload workspace</button></main> : this.props.children; }
}
