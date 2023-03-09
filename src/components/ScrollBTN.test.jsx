import { describe, expect, test } from 'vitest';
import { render, screen,fireEvent, waitFor } from '@testing-library/react';
import ScrollBTN from './ScrollBTN';


describe('ScrollBTN test', async () => {

    test('should render and show/hide button on scroll',async () => {
        const { container } = render(<ScrollBTN />);
        const button = container.querySelector('.scroll');      
        expect(button.style.display).toBe('none');
      });

});