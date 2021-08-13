import React, { Fragment } from 'react';

import { Transition, Dialog } from '@headlessui/react';

import { User } from '../types/User';

interface IModalProps {
  user?: User;
  showModal: boolean;
  setShowModal: () => any;
}
export const Modal: React.FC<IModalProps> = ({
  showModal,
  user,
  setShowModal,
}) => {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setShowModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block relative w-full max-w-md px-2 py-2 my-8 overflow-unset text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="modal-content py-4 text-left px-2">
                <div className="flex justify-center items-center pb-3">
                  <div className="inline-flex absolute -top-16 shadow-lg rounded-full overflow-hidden h-40 w-40">
                    <img
                      src={user?.picture.large}
                      alt=""
                      className="h-full w-full"
                    />
                  </div>
                  <button
                    type="button"
                    className="modal-close ml-auto cursor-pointer z-50"
                    onClick={() => {
                      setShowModal();
                    }}
                  >
                    <svg
                      className="fill-current text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center  p-4">
                  <h2 className="mt-16 font-bold text-xl">
                    {`${user?.name.first}  ${user?.name.last}`}
                  </h2>
                  <h6 className="mt-0.5 text-xs font-small">{user?.email}</h6>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 w-full mt-4">
                    <p className="text-sm  text-left mt-3">
                      <strong>Gender:</strong> {user?.gender}
                    </p>
                    <p className="text-sm text-left mt-3">
                      <strong>Birthdate:</strong> {user?.dob.date}
                    </p>
                    <p className="text-sm text-left mt-3">
                      <strong>Phone:</strong> {user?.phone}
                    </p>
                    <p className="text-sm text-left mt-3">
                      <strong>Nationality:</strong> {user?.location.country}
                    </p>
                    <p className="text-sm text-left mt-3">
                      <strong>Address:</strong> {user?.location.street.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
