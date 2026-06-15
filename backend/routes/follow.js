const express = require("express");
const router = express.Router();
const sequelize =
  require("../config/database"); // sesuaikan dengan file db kamu

const { QueryTypes } =
  require("sequelize");

// =========================
// AMBIL STATS FOLLOW
// =========================
router.get(
  "/stats/:id",
  async (req, res) => {
    const userId =
      req.params.id;

    const currentUserId =
      req.query.currentUserId;

    try {
      // jumlah followers
      const followers =
        await sequelize.query(
          `
          SELECT COUNT(*) AS total
          FROM followers
          WHERE following_id = :userId
        `,
          {
            replacements: {
              userId,
            },
            type:
              QueryTypes.SELECT,
          }
        );

      // jumlah following
      const following =
        await sequelize.query(
          `
          SELECT COUNT(*) AS total
          FROM followers
          WHERE follower_id = :userId
        `,
          {
            replacements: {
              userId,
            },
            type:
              QueryTypes.SELECT,
          }
        );

      // cek apakah user follow
      let isFollowing =
        false;

      if (
        currentUserId
      ) {
        const check =
          await sequelize.query(
            `
            SELECT *
            FROM followers
            WHERE follower_id =
              :currentUserId
            AND following_id =
              :userId
          `,
            {
              replacements:
                {
                  currentUserId,
                  userId,
                },

              type:
                QueryTypes.SELECT,
            }
          );

        isFollowing =
          check.length > 0;
      }

      res.json({
        followers:
          followers[0]
            .total,
        following:
          following[0]
            .total,
        isFollowing,
      });

    } catch (err) {
      console.log(err);

      res
        .status(500)
        .json({
          error:
            err.message,
        });
    }
  }
);

// =========================
// FOLLOW / UNFOLLOW
// =========================
router.post(
  "/toggle",
  async (req, res) => {

  const {
    followerId,
    followingId,
  } = req.body;

  // VALIDASI BODY
  if (
    !followerId ||
    !followingId
  ) {
    return res
      .status(400)
      .json({
        error:
          "followerId dan followingId wajib diisi",
      });
  }

  try {
      // cek apakah sudah follow
      const check =
        await sequelize.query(
          `
          SELECT *
          FROM followers
          WHERE follower_id =
            :followerId
          AND following_id =
            :followingId
        `,
          {
            replacements:
              {
                followerId,
                followingId,
              },

            type:
              QueryTypes.SELECT,
          }
        );

      // =================
      // UNFOLLOW
      // =================
      if (
        check.length >
        0
      ) {
        await sequelize.query(
          `
          DELETE FROM followers
          WHERE follower_id =
            :followerId
          AND following_id =
            :followingId
        `,
          {
            replacements:
              {
                followerId,
                followingId,
              },

            type:
              QueryTypes.DELETE,
          }
        );

        return res.json(
          {
            success:
              true,
            message:
              "Unfollow berhasil",
          }
        );
      }

      // =================
      // FOLLOW
      // =================
      await sequelize.query(
        `
        INSERT INTO followers
        (
          follower_id,
          following_id
        )
        VALUES (
          :followerId,
          :followingId
        )
      `,
        {
          replacements:
            {
              followerId,
              followingId,
            },

          type:
            QueryTypes.INSERT,
        }
      );

      res.json({
        success: true,
        message:
          "Follow berhasil",
      });

    } catch (err) {
      console.log(err);

      res
        .status(500)
        .json({
          error:
            err.message,
        });
    }
  }
);

router.get(
  "/followers/:id",
  async (req, res) => {
    try {
      const [data] =
        await sequelize.query(
          `
          SELECT users.id,
                 users.name,
                 users.email,
                 users.photo
          FROM followers
          JOIN users
          ON users.id =
             followers.follower_id
          WHERE followers.following_id = ?
          `,
          {
            replacements: [
              req.params.id,
            ],
          }
        );

      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:
          "Gagal mengambil followers",
      });
    }
  }
);

router.get(
  "/following/:id",
  async (req, res) => {
    try {
      const [data] =
        await sequelize.query(
          `
          SELECT users.id,
                 users.name,
                 users.email,
                 users.photo
          FROM followers
          JOIN users
          ON users.id =
             followers.following_id
          WHERE followers.follower_id = ?
          `,
          {
            replacements: [
              req.params.id,
            ],
          }
        );

      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:
          "Gagal mengambil following",
      });
    }
  }
);

module.exports =
  router;