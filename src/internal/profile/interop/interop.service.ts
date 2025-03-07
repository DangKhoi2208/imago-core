import { Inject, Injectable } from '@nestjs/common';
import { AuthUseCase } from 'src/domain/auth.domain';
import {
  ErrorIdEmpty,
  Profile,
  ProfileInterop,
  ProfileUseCase,
} from 'src/domain/profile.domain';

@Injectable()
export class InteropService implements ProfileInterop {
  constructor(
    @Inject('ProfileUseCase') private profileUseCase: ProfileUseCase,
    @Inject('AuthUseCase') private authUseCase: AuthUseCase,
  ) {}

  async follow(
    token: string,
    profileId: string,
    otherProfileId: string,
  ): Promise<any> {
    try {
      await this.authUseCase.verifyToken(token);
      let profile = await this.profileUseCase.get(profileId);
      let otherProfile = await this.profileUseCase.get(otherProfileId);
      if (profile) {
        if (
          this.isExisted(profile.following, otherProfileId) ||
          profileId === otherProfileId
        ) {
          return false;
        }
        if (
          !profile.following === undefined ||
          profile.following.length === 0 ||
          !this.isExisted(profile.following, otherProfileId)
        ) {
          if (
            !otherProfile.followers === undefined ||
            otherProfile.followers.length === 0 ||
            otherProfile.followers.includes(profileId) ||
            profile.followers.includes(otherProfileId)
          ) {
            profile.following.push(otherProfileId);
            otherProfile.followers.push(profileId);
            await this.profileUseCase.update(profile);
            await this.profileUseCase.update(otherProfile);
          }
        }
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  async unfollow(
    token: string,
    profileId: string,
    otherProfileId: string,
  ): Promise<any> {
    try {
      await this.authUseCase.verifyToken(token);
      let profile = await this.profileUseCase.get(profileId);
      let otherProfile = await this.profileUseCase.get(otherProfileId);
      if (profile) {
        if (this.isExisted(profile.following, otherProfileId)) {
          if (otherProfile.followers.includes(profileId)) {
            profile.following = profile.following.filter(
              (item) => item !== otherProfileId,
            );
            otherProfile.followers = otherProfile.followers.filter(
              (item) => item !== profileId,
            );
            await this.profileUseCase.update(profile);
            await this.profileUseCase.update(otherProfile);
          }
        }
        if (!this.isExisted(profile.following, otherProfileId)) {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  }

  isExisted(checkArray: string[], id: string): Boolean {
    for (let i = 0; i < checkArray.length; i++) {
      if (checkArray[i] === id) {
        return true;
      }
    }
    return false;
  }

  async create(profile: Profile, token: string): Promise<boolean> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const profileData: Profile = {
        id: decodedToken.uid,
        email: decodedToken.email,
        bio: profile.bio || '',
        photoUrl: profile.photoUrl || '',
        phone: profile.phone || '',
        userName: profile.userName || '',
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        category: profile.category || [],
        followers: profile.followers || [],
        following: profile.following || [],
        gender: profile.gender || '',
      };
      return this.profileUseCase.create(profileData);
    } catch (error) {
      throw error;
    }
  }

  async update(profile: Profile, token: string): Promise<boolean> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const _profile = await this.profileUseCase.get(decodedToken.uid);
      const profileData: Profile = {
        ..._profile,
        ...profile,
      };
      return await this.profileUseCase.update(profileData);
    } catch (error) {
      throw error;
    }
  }

  async get(id: string, token: string): Promise<Profile> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      if (!id) {
        throw ErrorIdEmpty;
      }
      return await this.profileUseCase.get(id);
    } catch (error) {
      throw error;
    }
  }

  getAll(token: string): Promise<Profile[]> {
    try {
      const decodedToken = this.authUseCase.verifyToken(token);
      return this.profileUseCase.getAll();
    } catch (error) {
      throw error;
    }
  }

  async getMine(token: string): Promise<Profile> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      return this.profileUseCase.get(decodedToken.uid);
    } catch (error) {
      throw error;
    }
  }
}
