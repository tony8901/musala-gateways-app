import React, { Component } from 'react';
import { Table } from 'reactstrap';
import AppNavbar from '../navbar/AppNavbar';
import instance from '../../utils/instance';

class BookList extends Component {
  state = {
    books: []
  };

  async componentDidMount() {
    try {
      const response = await instance.get('/books');
      const body = await response.data;
      this.setState({ books: body });
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        window.location.href = '/access';
      } else{
        window.location.href = '/error';
      }
    }
  }

  render() {
    const { books } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <AppNavbar />
          <div className="App-intro">
            <h2>books</h2>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>
                    id
                  </th>
                  <th>
                    pages
                  </th>
                  <th>
                    autor
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map(book =>
                  <><tr key={book.id}><td> {book.id}</td>
                    <td>{book.pages}</td>
                    <td>{book.autor}</td></tr></>
                )}
              </tbody>
            </Table>            
          </div>
        </header>
      </div>
    );
  }
}
export default BookList;
