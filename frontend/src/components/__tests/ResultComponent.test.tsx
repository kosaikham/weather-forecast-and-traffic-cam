import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { ResultComponent } from '../ResultComponent';

describe('<ResultComponent />', () => {
  it('has the correct text', () => {
    const selectedOption = {
      name: 'Marine Parade',
      weather: 'Cloudy',
      location: { latitude: 1.297512569, longitude: 103.8983019 },
      image: 'https://images.data.gov.sg/api/traffic-images/2023/07/a11f21c0-382d-4293-8008-56cd47f485f6.jpg',
      id: 36
    }
    render(<ResultComponent selectedOption={selectedOption} visible/>);
    expect(screen.getByText('Cloudy')).toBeTruthy();
  });
});

describe('<ResultComponent /> snapshot', () => {
  it('renders correctly', () => {
    const selectedOption = {
      name: 'Marine Parade',
      weather: 'Cloudy',
      location: { latitude: 1.297512569, longitude: 103.8983019 },
      image: 'https://images.data.gov.sg/api/traffic-images/2023/07/a11f21c0-382d-4293-8008-56cd47f485f6.jpg',
      id: 36
    }
    const tree = renderer.create(<ResultComponent selectedOption={selectedOption} visible />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});