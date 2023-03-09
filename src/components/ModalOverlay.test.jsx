import { describe, expect, test } from 'vitest';
import { render, screen,fireEvent, waitFor ,act} from '@testing-library/react';
import ModalOverlay, { Modal } from './ModalOverlay';
import ApolloLaunch from '../pages/ApolloLaunch';
import  ReactDOM from 'react-dom';
import App from '../App'
import { BrowserRouter,MemoryRouter  } from 'react-router-dom';

describe('Modal component', () => {
    const hide = vi.fn()
    const show = vi.fn()
    test('The component should render in body when open', () => {
        const {baseElement} = render(
            <ModalOverlay toggle={show}>
                <Modal hide={hide}/>
            </ModalOverlay>
        );
        expect(baseElement).toMatchSnapshot();
    });
  
});
