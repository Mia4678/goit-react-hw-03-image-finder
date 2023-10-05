import { Component } from 'react';
import css from './Searchbar.module.css';

// export class Searchbar extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       query: '',
//     };
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.query);
//   };

//   handleInputChange = e => {
//     this.setState({
//       query: e.target.value,
//     });
//   };

//   render() {
//     const { query } = this.state;

//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label">Search</span>
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={query}
//             onChange={this.handleInputChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

export class Searchbar extends Component {
  state = { value: '' };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.value);
  };

  render() {
    return (
      <div className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <div className={css.inputWrapper}>
            <label
              htmlFor="findImages"
              //className={css.SearchFormButtonLabel}
            ></label>
            <input
              className={css.SearchFormInput}
              name="title"
              type="text"
              onChange={this.handleChange}
              id="findImages"
              value={this.state.value}
              placeholder="Search images..."
            />

            <button type="submit" className={css.SearchFormButton}>
              <span className={css.SearchFormButtonLabel}></span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
