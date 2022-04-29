import { all,call, put , takeLatest } from "redux-saga/effects";
import UserActionTypes from "./user.types";

import {signInSuccess, signOutFailure, signOutSuccess,signInFailure, signUpSuccess, signUpFailre} from "./user.actions";
import {auth, googleProvider,getCurrentUser,createUserProfile} from "./../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try{
        const userRef = yield call(createUserProfile,userAuth, additionalData);
        const snapShot = yield userRef.get();
        yield put(
            signInSuccess({
                id: snapShot.id,
                ...snapShot.data()
            })
        );
    } catch(err){
        //console.log(err);
    } 
}

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (err) {
        yield put(signInFailure(err));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle);
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (err) {
        yield put(signInFailure(err));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated);
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signInWithEmail({ payload:{email,password} }) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        yield  getSnapshotFromUserAuth(user);
    } catch (err) {
        yield put (signInFailure(err));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail);
}

export function* signUp({payload: {email,password,displayName}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email,password);
        yield put(signUpSuccess({user, additionalData:{displayName}}));
    } catch (error) {
        yield put(signUpFailre(error));
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START,signUp);
}

export function* signInAfterSignUp({payload: {user, additionalData} }) {
    yield getSnapshotFromUserAuth(user,additionalData);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onCheckUserSession),
        call(onEmailSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}