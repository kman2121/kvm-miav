import { Location, Permissions } from 'expo';

import * as storage from './storage';

API_ENDPOINT = 'https://cs5356-miav.appspot.com/api/v1';

const getCurrentLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === 'granted') {
    const location = await Location.getCurrentPositionAsync({});
    return [location.coords.latitude, location.coords.longitude];
  } else {
    return [40.755644, -73.956097];
  }
}

const parseTime = t => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}T${t.substr(0, 5)}`;
}

export const registerPassenger = async (username, phone, password, confirm_password) => {
  const url = `${API_ENDPOINT}/passengers`;
  res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user.username': username,
      'user.phone': phone,
      'user.password': password,
      'user.confirm_password': confirm_password
    })
  });

  if (res.status == 200) {
    body = await reset.json();
    storage.setUser(body.token, body.user);

    return body.user;
  } else {
    console.log(await res.text());
    return null;
  }
}

export const registerDriver = async (username, phone, password, confirm_password, vehicle_year, vehicle_make, vehicle_model, vehicle_license) => {
  const url = `${API_ENDPOINT}/drivers`;
  res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user.username': username,
      'user.phone': phone,
      'user.password': password,
      'user.confirm_password': confirm_password,
      'vehicle.year': vehicle_year,
      'vehicle.make': vehicle_make,
      'vehicle.model': vehicle_model,
      'vehicle.license': vehicle_license
    })
  });

  if (res.status == 200) {
    body = await res.json();
    storage.setUser(body.token, body.user);

    return body.user;
  } else {
    console.log(await res.text());
    return null;
  }
}

export const verify = async (token) => {
  const url = `${API_ENDPOINT}/auth/verify`;

  res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token
    })
  });

  if (res.status === 200) {
    body = await res.json();
    storage.setUser(body.token, body.user);

    return body.user;
  } else {
    console.log(await res.text());
    return null;
  }
}

export const login = async (username, password) => {
  const url = `${API_ENDPOINT}/auth/login`;
  res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  if (res.status === 200) {
    body = await res.json();
    storage.setUser(body.token, body.user);

    return body.user;
  } else {
    console.log(await res.text());
    return null;
  }
}

export const createJob = async (job_type, start_time, num_boxes, max_price, description, end_time) => {
  const url = `${API_ENDPOINT}/jobs`;
  const token = await storage.getToken();
  [lat, long] = await getCurrentLocation();

  res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    body: JSON.stringify({
      job_type,
      start_time: parseTime(start_time),
      num_boxes,
      max_price,
      description,
      job_loc_lat: lat,
      job_loc_long: long,
      end_time: end_time ? parseTime(end_time) : end_time
    })
  });

  if (res.status === 201) {
    return true;
  } else {
    console.log(await res.text());
    return false;
  }
}

export const getJobs = async () => {
  const url = `${API_ENDPOINT}/jobs`;
  const token = await storage.getToken();
  
  res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Authorization': `JWT ${token}`
    }
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    console.log(await res.text());
    return null;
  }
}
  
export const getJobsByPassenger = async (passengerId) => {
  const url = `${API_ENDPOINT}/jobs?passenger=${passengerId}`;
  const token = await storage.getToken();
  
  res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Authorization': `JWT ${token}`
    }
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    console.log(await res.text());
    return null;
  }
}

export const changeJobStatus = async (jobId, status) => {
	const url = `${API_ENDPOINT}/jobs/${jobId}`;
	const token = await storage.getToken();

	res = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `JWT ${token}`
		},
		body: JSON.stringify({
			status: status,
		})
	});

	if (res.status === 200) {
		return true;
	} else {
		console.log(await res.text());
		return false;
	}
}
