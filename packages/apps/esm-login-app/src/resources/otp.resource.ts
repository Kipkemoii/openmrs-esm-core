import { etlBaseUrl, localhostUrl } from '../../../../../staging-config.json';

export async function getOtp(username: string, password: string) {
  const params = new URLSearchParams({ username });
  const credentials = window.btoa(`${username}:${password}`);

  const url = `${etlBaseUrl}otp?${params.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch OTP');
  }

  const data = await res.json();

  return data;
}

export async function verifyOtp(username: string, password: string, otp: string) {
  const url = etlBaseUrl + 'verify-otp';
  const credentials = window.btoa(`${username}:${password}`);

  const body = { username, otp };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json', Authorization: `Basic ${credentials}` },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return data;
}
