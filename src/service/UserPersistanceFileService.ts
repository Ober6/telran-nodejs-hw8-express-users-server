export interface UserPersistanceFileService {
    saveDataToFile():Promise<void>;
    restoreDataFromFile():Promise<void>;
}