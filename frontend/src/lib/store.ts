import { writable } from 'svelte/store';
import type { Record } from 'pocketbase';

type Board = Record | undefined;

export const currentBoard = writable<Board>();
