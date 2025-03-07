import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  ErrorFieldEmpty,
  ErrorIdEmpty,
  ErrorProfileExists,
  Profile,
  ProfileRepository,
  ProfileUseCase,
} from 'src/domain/profile.domain';

@Injectable()
export class UsecaseService implements ProfileUseCase {
  constructor(
    @Inject('ProfileRepository') private profileRepository: ProfileRepository,
  ) {}

  async create(profile: Profile): Promise<boolean> {
    try {
      const isExists = await this.profileRepository.get(profile.id);
      if (isExists) {
        throw ErrorProfileExists;
      }
    } catch (error) {
      if ((error as HttpException) == ErrorProfileExists) {
        throw error;
      } else {
        try {
          if (this.isFieldEmpty(profile)) {
            throw ErrorFieldEmpty;
          }
          return this.profileRepository.create(profile);
        } catch (error) {
          throw error;
        }
      }
    }
  }

  async update(profile: Profile): Promise<boolean> {
    try {
      const isExists = await this.profileRepository.get(profile.id);
      if (isExists) {
        if (this.isFieldEmpty(profile)) {
          throw ErrorFieldEmpty;
        }
        return this.profileRepository.update(profile);
      }
    } catch (error) {
      throw error;
    }
  }

  async get(id: string): Promise<Profile> {
    try {
      if (!id) {
        throw ErrorIdEmpty;
      } else {
        return this.profileRepository.get(id);
      }
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<Profile[]> {
    try {
      return this.profileRepository.getAll();
    } catch (error) {
      throw error;
    }
  }

  isFieldEmpty(profile: Profile): boolean {
    return (
      !profile.id ||
      !profile.email ||
      !profile.userName ||
      !profile.lastName ||
      !profile.firstName ||
      profile.id === '' ||
      profile.email === '' ||
      profile.userName === '' ||
      profile.lastName === '' ||
      profile.firstName === ''
    );
  }
}
