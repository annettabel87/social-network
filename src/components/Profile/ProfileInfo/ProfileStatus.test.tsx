import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
  test('after creation <span> should contains correct status', () => {
    render(<ProfileStatus status={'it-kamasutra'} updateStatus={(status) => {}} />);

    expect(screen.getByTestId('status').textContent).toBe('status: it-kamasutra');
  });

  test('after creation  <input> not be displayed', () => {
    render(<ProfileStatus status={'it-kamasutra'} updateStatus={(status) => {}} />);
    const input = screen.queryByTestId('statusInput');
    expect(input).not.toBeInTheDocument();
  });

  test('input should be displayed in editMode instead of span', () => {
    render(<ProfileStatus status={'it-kamasutra'} updateStatus={(status) => {}} />);
    fireEvent.doubleClick(screen.getByTestId('status'));
    expect(screen.getByTestId('statusInput')).toBeInTheDocument();
  });

  test('callback should be called', () => {
    const mockCallBack = jest.fn();
    render(<ProfileStatus status={'it-kamasutra'} updateStatus={mockCallBack} />);
    fireEvent.doubleClick(screen.getByTestId('status'));
    fireEvent.blur(screen.getByTestId('statusInput'));
    expect(mockCallBack).toBeCalledTimes(1);
  });
});
