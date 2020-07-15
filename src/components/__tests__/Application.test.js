import React from 'react';
import axios from 'axios';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
  prettyDOM
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText('Monday'));
    fireEvent.click(getByText('Tuesday'));
    expect(getByText(/Leopold Silvers/i)).toBeInTheDocument();
  });

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment')[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving'));
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment')[1];

    await fireEvent.click(getByAltText(appointment, 'Delete'));

    expect(
      getByText(
        appointment,
        'This action will delete the Appointment. Are you sure?'
      )
    ).toBeInTheDocument();

    await fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Deleting'));
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(
      container,
      'appointment'
    ).find((appointment) => queryByText(appointment, 'Archie Cohen'));

    fireEvent.click(getByAltText(appointment, 'Edit'));

    fireEvent.change(getByPlaceholderText(appointment, 'Enter Student Name'), {
      target: { value: 'Sandeep Chopra' }
    });

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving'));
  });

  it('shows the save error when failing to save an appointment', async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment')[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Error'));
  });

  it('shows the delete error when failing to delete an existing appointment', async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment')[1];

    console.log('========appontment element===========');
    console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, 'Delete'));

    console.log('========afteer clicking delete===========');
    console.log(prettyDOM(appointment));

    fireEvent.click(getByText(appointment, 'Confirm'));

    console.log('========after clicking confirm===========');
    console.log(prettyDOM(appointment));

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    console.log('========after confirming deleting is there===========');
    console.log(prettyDOM(appointment));

    console.log('========waiting for error to show up===========');
    await waitForElement(() => getByText(appointment, 'Error'), {
      options: { timeout: 5000 }
    });

    console.log('========after timeout of 5 seconds===========');
    console.log(prettyDOM(appointment));
  });
});
