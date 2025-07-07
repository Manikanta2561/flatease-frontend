import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log the error to an error reporting service
    this.setState({ error, info });
    console.log('Error:', error);
    console.log('Error info:', info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="alert alert-danger">Something went wrong with the animation.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;