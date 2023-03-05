import React from "react";

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="d-flex main justify-content-center align-items-center">
          <div className="text-center">
            <h4 className="text-center">เกิดข้อผิดพลาดชึ้น โปรดลองอีกครั้ง</h4>
            <button
              type="button"
              className="orange_btn"
              onClick={() => this.setState({ hasError: false })}
            >
              ลองอีกครั้ง
            </button>
          </div>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
