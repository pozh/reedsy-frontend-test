import axios from 'axios';

/**
 *
 * @param url: String API endpoint URL
 * @returns {Promise<{status: string, message: string}>}
 */
export async function get(url) {
  try {
    const {data} = await axios.get(url);
    return data;
  } catch (error) {
    return {
      status: 'error',
      message: 'Server error. ' + error.message
    };
  }
}
