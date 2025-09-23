import React, { Component } from 'react';
import Rating from "pre-rating/lib/Rating";
import "./SpotifyApp.css";
import PropTypes from "prop-types";

export default class TableItem extends Component {

    static propTypes = {
        /**
         * Data of Albums and Artists
         */
        data: PropTypes.object.isRequired,
        /**
         * Image URL
         */
        image: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            audio: null
        };
    }

    render() {
        const data = this.props.data;
        const image = this.props.image;

        console.log('Track data:', data);
        console.log('Preview URL:', data.preview_url);

        return (
            <tr>
                <td className="alignTd">
                    <img src={image} alt="55x55" width="55" height="55"/>
                </td>
                <td className="alignTd">{data.artists[0].name}</td>
                <td className="alignTd">{data.name}</td>
                <td className="alignTd">{data.album.name}</td>
                <td className="alignTd">{data.album.album_type}</td>
                <td className="alignTd">{data.type}</td>
                <td className="alignTd">
                    <Rating 
                        size={0}
                        currentValue={data.popularity / 10}
                        disabled
                    />
                </td>
                <td className="alignTd">
                    {data.preview_url ? (
                        <i 
                            className={`fa ${this.state.isPlaying ? 'fa-pause' : 'fa-play'}`} 
                            aria-hidden="true"
                            onClick={this.__playButtonClick.bind(this, data.preview_url)}
                            style={{cursor: 'pointer', color: this.state.isPlaying ? '#1db954' : '#333', fontSize: '16px'}}
                            title={`${this.state.isPlaying ? 'Pause' : 'Play'} 30-second preview`}
                        />
                    ) : (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <i 
                                className="fa fa-external-link" 
                                aria-hidden="true"
                                onClick={() => window.open(data.external_urls.spotify, '_blank')}
                                style={{cursor: 'pointer', color: '#1db954', fontSize: '14px', marginRight: '5px'}}
                                title="Open in Spotify (no preview available)"
                            />
                            <span style={{color: '#999', fontSize: '11px'}}>No preview</span>
                        </div>
                    )}
                </td>
            </tr>
        );
    }

    __playButtonClick = (url) => {
        console.log('Attempting to play preview URL:', url);

        if (!url) {
            console.log('No preview URL available for this track');
            alert('No preview available for this track. This might be due to licensing restrictions or an expired Spotify API token.');
            return;
        }

        const currentAudio = this.state.audio;

        if (this.state.isPlaying && currentAudio) {
            currentAudio.pause();
            this.setState({ isPlaying: false });
            console.log('Audio paused');
        } else {
            if (currentAudio) {
                currentAudio.pause();
            }

            const newAudio = new Audio(url);

            newAudio.addEventListener('ended', () => {
                console.log('Audio playback ended');
                this.setState({ isPlaying: false, audio: null });
            });

            newAudio.addEventListener('error', (e) => {
                console.error('Error playing audio:', e);
                this.setState({ isPlaying: false, audio: null });

                // Avoid optional chaining for older Node/Babel
                const msg = e.target && e.target.error && e.target.error.message ? e.target.error.message : 'Unknown error';
                alert(`Error playing audio: ${msg}`);
            });

            newAudio.addEventListener('loadstart', () => {
                console.log('Started loading audio');
            });

            newAudio.addEventListener('canplay', () => {
                console.log('Audio can start playing');
            });

            console.log('Attempting to play audio...');
            newAudio.play().then(() => {
                console.log('Audio playback started successfully');
                this.setState({ isPlaying: true, audio: newAudio });
            }).catch((error) => {
                console.error('Error playing audio:', error);
                this.setState({ isPlaying: false, audio: null });
                alert(`Cannot play audio: ${error.message}`);
            });
        }
    };

    componentWillUnmount() {
        if (this.state.audio) {
            this.state.audio.pause();
            this.setState({ audio: null });
        }
    }
}
