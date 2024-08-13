import * as fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

const generateContacts = async (number) => {
  try {
    // Читаємо існуючі контакти з файлу
    const data = await fs.readFile(PATH_DB, 'utf8');
    const contacts = JSON.parse(data);

    // Генеруємо нові контакти
    const newContacts = Array.from({ length: number }, () =>
      createFakeContact(),
    );

    // Додаємо нові контакти до існуючих
    const updatedContacts = [...contacts, ...newContacts];

    // Записуємо оновлені контакти назад у файл
    await fs.writeFile(
      PATH_DB,
      JSON.stringify(updatedContacts, null, 2),
      'utf8',
    );
  } catch (error) {
    console.error(error);
  }
};
// Виклик функції для генерації 5 контактів
generateContacts(5);
