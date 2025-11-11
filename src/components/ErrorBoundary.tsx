import { Component, type ErrorInfo, type ReactNode, type CSSProperties } from 'react';

import {ErrorBanner} from './index';

type ErrorBoundaryProps = {
    children?:ReactNode | string
}

type ErrorBoundaryState = {
    hasError:boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props:ErrorBoundaryProps){
        super(props);
        this.state = {hasError:false }
    }
    static getDerivedStateFromError(_:unknown):ErrorBoundaryState{
        return {hasError: true}
    }
    componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
        console.error('Error caught', error, errorInfo)
    }


    render(){
        return this.state.hasError? (
            <>
            <ErrorBanner/>
            
            <div className='container-error'>

                <h2 className='error-title'>Something went wrong</h2>    
                <p className='error-message'>An unexpected error occurred. Please try refreshing the page.</p>
                <p className='error-message'>If this error reapts itself send us an email</p>

                <button className='error-button' onClick={()=>window.location.reload()}>
                    Refresh the page
                </button>

            </div>
            </>
        ) 
        : this.props.children;

    }


}


export default ErrorBoundary