import Pocketbase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new Pocketbase('http://127.0.0.1:8090');

export const currentUser = writable(pb.authStore.model);
