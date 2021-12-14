import {getStoredStateOrDefault} from './localstore'

const BASE_URI = "http://206.81.21.110/api/v1"

function getPolls() {
  const { token } = getStoredStateOrDefault()
  const params = {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  return fetch(`${BASE_URI}/polls`, params)  
    .then(function(res) {
      return res.json();
    })
    
}

function createPoll(poll) {
  const {token} = getStoredStateOrDefault();
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(poll)
  };

  return fetch(`${BASE_URI}/polls`, params).then((res) => res.json());
}

function deletePoll(id) {
  const {token} = getStoredStateOrDefault();
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  return fetch(`${BASE_URI}/poll/${id}`, options).then((res) => res.json());
}

// selected option is
// {
//    optionId: "wsqrb"
// }
function voteForPoll(id, selectedOption) {
  const {token} = getStoredStateOrDefault();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(selectedOption)
  };

  return fetch(`${BASE_URI}/poll/${id}/vote`, options).then((res) => res.json());
}

function getPoll(id) {
  const {token} = getStoredStateOrDefault();
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };

  return fetch(`${BASE_URI}/poll/${id}`, options).then((res) => res.json());
}

export default {
  getPolls, createPoll, deletePoll, voteForPoll, getPoll
}
