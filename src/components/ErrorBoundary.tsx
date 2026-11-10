import { Component, type ErrorInfo, type ReactNode } from 'react';
import { EVENT } from '../data/event';

/** If the page crashes, students can still reach the form and the organizers. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
    window.bzIntro?.ready();
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="min-h-svh bg-void text-paper flex items-end">
        <div className="wrap py-14">
          <h1 className="display text-d5 text-sun">Below Zero</h1>
          <p className="body-copy mt-5">This page failed to load. Reload it, or register using the form directly.</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-4">
            <a className="btn btn-solid-sun" href={EVENT.registrationUrl} target="_blank" rel="noopener noreferrer">
              Open the form
            </a>
            <a className="btn btn-line text-paper" href={`mailto:${EVENT.email}`}>
              <span>Email the organizers</span>
            </a>
          </div>
        </div>
      </main>
    );
  }
}
