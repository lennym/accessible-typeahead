import { h, Component } from 'preact' /** @jsx h */
import debounce from 'lodash.debounce'

export default class Status extends Component {
  state = {
    cleared: true
  }

  componentWillReceiveProps ({ length }) {
    const hasChanged = length !== this.props.length
    const stillNoResults = length === 0
    if (hasChanged || stillNoResults) {
      this.setState({
        cleared: false
      }, () => {
        this.clearContent()
      })
    }
  }

  clearContent = debounce(() => {
    this.setState({
      cleared: true
    })
  }, 1000)

  render () {
    const { length, queryLength, minQueryLength, selectedOption } = this.props
    const { cleared } = this.state

    const words = {
      result: (length === 1) ? 'result' : 'results',
      is: (length === 1) ? 'is' : 'are'
    }

    const queryTooShort = queryLength < minQueryLength
    const noResults = length === 0

    return <div
      aria-live='polite'
      role='status'
      style={{
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        marginBottom: '-1px',
        marginRight: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: '1px'
      }}
    >
      {(cleared)
        ? <p />
        : (queryTooShort)
          ? <p>Type in {minQueryLength} or more characters for results.</p>
          : (noResults)
            ? <p>No search results.</p>
            : <p>
              {length} {words.result} {words.is} available. {(selectedOption)
                ? <span>{selectedOption} (1 of {length}) is selected.</span>
                : <span />
              }
            </p>
      }
    </div>
  }
}
