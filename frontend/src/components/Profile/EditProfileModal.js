import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";

import Modal from "../shared/Modal/Modal";
import ErrorMessage from "../shared/Modal/ErrorMessage";
import MobileInput from "../shared/Form/MobileInput";
import FileUpload from "../shared/Form/FileUpload";
import AvatarEditor from "react-avatar-editor";
import { Range, getTrackBackground } from "react-range";

import "./editProfileModal.css";
import useMobile from "../../hooks/useMobile";

const EditProfileModal = ({ user, onSubmit, hideModal }) => {
  const [editImg, setEditImg] = useState(false);
  const [edittedImg, setEdittedImg] = useState(null);
  const [imgBlob, setImgBlob] = useState(null);

  const editorRef = useRef(null);
  const [scale, setScale] = useState(1);
  const isMobile = useMobile();

  function onClose() {
    delete user.imagePending;
    delete user.imageRejected;
    delete user.isPending;
    delete user.isRejected;
    hideModal();
  }

  const {
    bio,
    avatar,
    isPending,
    isRejected,
    imagePending,
    imageRejected
  } = user;

  function onEditImage() {
    if (editorRef) {
      const { current } = editorRef;

      const canvasScaled = current.getImageScaledToCanvas();
      canvasScaled.toBlob(blob => {
        setImgBlob(blob);
      });
      setEdittedImg(canvasScaled.toDataURL());

      setEditImg(false);
    }
  }

  let backgroundImage = getTrackBackground({
    min: 1,
    max: 5,
    values: [scale],
    colors: ["#a60000", "rgb(201, 160, 160)"]
  });

  let children = (
    <>
      {!editImg && (isRejected || imageRejected) && (
        <ErrorMessage message="Couldn't apply update, please try again" />
      )}
      <Formik
        initialValues={{
          bio: bio || "",
          avatar: null
        }}
        onSubmit={values => {
          onSubmit({ ...values, avatar: imgBlob });
        }}
      >
        {({ values }) => (
          <Form
            className={
              "flex-col-cen border-box edit-profile-form" +
              (isMobile ? " padding-0-10-77" : "")
            }
          >
            {editImg ? (
              <>
                <AvatarEditor
                  ref={editorRef}
                  image={values.avatar}
                  width={310}
                  height={310}
                  border={20}
                  color={[255, 255, 255, 0.7]} // RGBA
                  scale={scale}
                  rotate={0}
                />

                <div className="flex-ai-center edit-profile-zoom-wrapper">
                  <i className="material-icons-outlined color-light-gray">
                    image
                  </i>
                  <Range
                    step={0.01}
                    min={1}
                    max={5}
                    values={[scale]}
                    onChange={x => setScale(x)}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="edit-profile-zoom-bar"
                        style={{
                          ...props.style,
                          backgroundImage
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props, isDragged }) => {
                      const { key, style } = props;
                      return (
                        <div
                          style={{
                            style
                          }}
                          key={key}
                          className="edit-profile-zoom-thumb-container flex-center"
                        >
                          <div
                            className={
                              "edit-profile-zoom-thumb" +
                              (isDragged
                                ? " edit-profile-zoom-thumb-active"
                                : "")
                            }
                          ></div>
                        </div>
                      );
                    }}
                  />
                  <i className="material-icons-outlined color-light-gray">
                    image
                  </i>
                </div>

                <button
                  className={
                    isMobile
                      ? "mobile-modal-submit-btn"
                      : "web-modal-submit-btn theme-btn-filled"
                  }
                  type="button"
                  onClick={onEditImage}
                >
                  Apply
                </button>
              </>
            ) : (
              <>
                <Field
                  name="avatar"
                  component={FileUpload}
                  onChange={() => setEditImg(true)}
                  button={
                    <>
                      <div className="edit-profile-img-container">
                        <img
                          src={
                            edittedImg || `/api/image/avatar/${avatar}_lg.jpg`
                          }
                          alt="Avatar"
                        />
                        <i className="material-icons-outlined">add_a_photo</i>
                        <div></div>
                      </div>
                    </>
                  }
                />
                <Field
                  name="bio"
                  component={MobileInput}
                  label="Bio"
                  textarea={true}
                  maxLength={160}
                  autoComplete="off"
                />
              </>
            )}
            <button
              className={
                editImg
                  ? "hidden"
                  : isMobile
                  ? "mobile-modal-submit-btn"
                  : "web-modal-submit-btn theme-btn-filled"
              }
              type="submit"
              disabled={isPending || imagePending}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </>
  );

  return (
    <Modal
      children={children}
      header={"Edit Profile"}
      toggleModal={onClose}
      onlyHideOnBtnClick={true}
    />
  );
};

export default EditProfileModal;
