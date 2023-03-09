import { describe, expect, test } from 'vitest';
import { render, screen,fireEvent } from '@testing-library/react';
import InformationContainer from './InformationContainer';

describe('InformationContainer test', () => {
  test('should render text props and preform button click', () => {
  
    const wrapper = render(<InformationContainer  title='nebula' copyright='jack' date = '1-12-22' explanation="a star" media_type="image" hdurl="https://example.com/image.jpg"/>);
    const title = screen.getByRole('heading', {name: /nebula/i})
    const date =  screen.getByRole('heading', {name: /date: 1-12-22/i})
    const copyright =screen.getByRole('copyright');
    const image = screen.getByAltText(''); 
    const iframe = screen.queryByRole('iframe');
    expect(title.textContent).toBe('nebula');
    expect(date.textContent).toBe('Date: 1-12-22');
    expect(image.getAttribute('src')).toEqual('https://example.com/image.jpg');
    expect(iframe).toBeNull();
    expect(copyright.textContent).toBe('© jack');
    });
   

});